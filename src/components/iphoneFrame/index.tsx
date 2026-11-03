import {useContext} from "react";
import {ConfigContext} from "../../utils/configContext";

interface Props {
  src: string;
}

function IphoneFrame({ src }: Props) {
  const config = useContext(ConfigContext);
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute top-2 bottom-2 left-2.5">
        <img
          src={src}
          alt={config?.ui.appScreenAlt ?? ""}
          className="rounded-2xl h-full"
        />
      </div>
      <img
        src="/misc/iphone-frame.webp"
        alt=""
        aria-hidden="true"
        className="relative z-10 h-full"
      />
    </div>
  );
}

export default IphoneFrame;
