import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";

export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle) {
  const [skillIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  skillIcon.use(
    k.area({ shape: new k.Rect(k.vec2(0), skillIcon.width + 50, skillIcon.height + 65) })
  );

  skillIcon.use(k.body());

  skillIcon.onCollide("player", (player) => {
    skillIcon.applyImpulse(player.direction.scale(250));
  });

  opacityTrickleDown(parent, [subtitleText]);

  return skillIcon;
}
