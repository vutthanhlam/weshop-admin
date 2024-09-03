import { Image } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
export function VariationImage({ img }: { img: any }) {
  console.log(img);
  return (
    <OverlayTrigger
      key={img.color}
      placement="right"
      overlay={<Tooltip id={`tooltip-${img.color}`}>{img.color}</Tooltip>}>
      <Image
        style={{ width: 30, height: 30 }}
        src={img.img_urls[0]}
        roundedCircle
        className="mx-1"></Image>
    </OverlayTrigger>
  );
}
