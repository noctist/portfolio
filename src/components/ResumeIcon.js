import { PALETTE } from "../constants";
import { isResumeModalVisibleAtom, selectedLinkAtom, selectedLinkDescriptionAtom, store } from "../store";
import makeIcon from "./Icon";
import { opacityTrickleDown } from "../utils";

export default function makeResumeIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  link,
  description
) {
  const [resumeIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const linkSwitch = resumeIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isResumeModalVisibleAtom, true);
    store.set(selectedLinkAtom, link);
    store.set(selectedLinkDescriptionAtom, description);
  });

  opacityTrickleDown(parent, [subtitleText, linkSwitch]);
  
  return resumeIcon;
}
