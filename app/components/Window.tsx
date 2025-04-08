import { type ReactNode, type CSSProperties } from "react";
import { TitleBar, Frame } from "@react95/core";
import { Computer, Help, Close } from "@react95/icons";

interface WindowProps {
  title: string;
  children: ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  outerStyle?: CSSProperties;
  onClose?: () => void;
}

export default function Window({
  title,
  children,
  outerClassName,
  innerClassName,
  outerStyle,
  onClose
}: WindowProps): ReactNode {
  return (
    <Frame
      boxShadow="$out"
      bgColor="#1a1a1a" // Dark background
      padding="$0.5"
      style={outerStyle}
      className={`rounded-lg ${outerClassName} min-[470px]:max-w-[550px]`}
    >
      <TitleBar
        icon={<Computer />}
        title={title}
        active
        className="bg-gray-800 text-white" // Title bar dark with white text
      >
        <TitleBar.OptionsBox>
          <TitleBar.Option>
            <Help />
          </TitleBar.Option>
          <TitleBar.Option>
            <Close onClick={onClose ? () => onClose() : undefined} />
          </TitleBar.Option>
        </TitleBar.OptionsBox>
      </TitleBar>

      <Frame
        bgColor="#222" // Inner frame background dark
        boxShadow="$in"
        padding="$2"
        className={`${innerClassName} text-gray-200 min-[470px]:max-w-[550px]`}
      >
        <Frame
          height="100%"
          width="100%"
          padding="$2"
          className="overflow-auto"
        >
          {children}
        </Frame>
      </Frame>
    </Frame>
  );
}
