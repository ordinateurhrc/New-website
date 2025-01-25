import { Dropbox } from "dropbox";
import { configDotenv } from "dotenv";
import fetch from "node-fetch";
import { mkdir, writeFile } from "fs/promises";
import { join, normalize, dirname, basename } from "path";
import { fileURLToPath } from "url";

// Internal dependencies
import {
  DropboxAuthError,
  DropboxFolderPathError,
  FileDownloadError,
  FolderDownloadError
} from "./errors";

async function downloadFile(filePath: string, localPath: string, dbx: Dropbox) {
  try {
    const filename = basename(filePath);
    const response = await dbx.filesDownload({ path: filePath });

    // Cast the response to the expected type
    const fileData = (response.result as any).fileBinary; // Use 'any' to bypass TypeScript checking

    // Create a buffer from the binary data
    const fileBuffer = Buffer.from(fileData);

    // Convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(fileBuffer);

    const localFilePath = join(localPath, filename);
    // Use Uint8Array for writing the file
    await writeFile(localFilePath, uint8Array);

    console.log(`Downloaded file: ${localFilePath}`);
  } catch (_error) {
    throw new FileDownloadError(filePath);
  }
}

async function downloadFolder(
  folderPath: string,
  localPath: string,
  dbx: Dropbox
) {
  try {
    const response = await dbx.filesListFolder({ path: folderPath });
    const entries = response.result.entries;
    for (const entry of entries) {
      if (typeof entry.path_lower !== "undefined") {
        if (entry[".tag"] === "file") {
          await downloadFile(entry.path_lower, localPath, dbx);
        } else if (entry[".tag"] === "folder") {
          const subFolderPath = entry.path_lower;
          const subLocalPath = join(localPath, basename(subFolderPath));
          await mkdir(subLocalPath, { recursive: true });
          await downloadFolder(subFolderPath, subLocalPath, dbx);
        }
      }
    }
  } catch (error) {
    if (error instanceof FileDownloadError) throw error;
    throw new FolderDownloadError(folderPath);
  }
}

//* Read DROPBOX_FOLDER_PATH environment variable and download that folder recursively to populate /content

export async function downloadContent() {
  configDotenv();

  const DROPBOX_FOLDER_PATH = process.env.DROPBOX_FOLDER_PATH;
  const DROPBOX_CLIENT_ID = process.env.DROPBOX_CLIENT_ID;
  const DROPBOX_CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET;
  const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
  const LOCAL_PATH = normalize(
    join(dirname(fileURLToPath(import.meta.url)), "..", "content")
  );

  const dbx = new Dropbox({
    clientId: DROPBOX_CLIENT_ID,
    clientSecret: DROPBOX_CLIENT_SECRET,
    refreshToken: DROPBOX_REFRESH_TOKEN,
    fetch
  });

  try {
    await dbx.usersGetCurrentAccount(); // get user info just to test the authentication
  } catch (_error) {
    throw new DropboxAuthError();
  }

  if (typeof DROPBOX_FOLDER_PATH !== "undefined") {
    await mkdir(LOCAL_PATH, { recursive: true });
    await downloadFolder(DROPBOX_FOLDER_PATH, LOCAL_PATH, dbx);
  } else {
    throw new DropboxFolderPathError();
  }
}
