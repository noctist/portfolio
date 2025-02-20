import makeSection from "./components/Section";
import makeEmailIcon from "./components/EmailIcon";
import makeSocialIcon from "./components/SocialIcon";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import makeKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";
import { makeAppear } from "./utils";
import makeSkillIcon from "./components/SkillIcon";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeProjectCard from "./components/ProjectCard";
import makeResumeIcon from "./components/ResumeIcon";

export default async function initGame() {
  const generalData = await (await fetch("./configs/generalData.json")).json();
  const socialsData = await (await fetch("./configs/socialsData.json")).json();
  const skillsData = await (await fetch("./configs/skillsData.json")).json();
  const experiencesData = await (
    await fetch("./configs/experiencesData.json")
  ).json();
  const projectsData = await (
    await fetch("./configs/projectsData.json")
  ).json();

  const k = makeKaplayCtx();
  k.loadSprite("player", "./sprites/player.png", {
    sliceX: 4,
    sliceY: 8,
    anims: {
      "walk-down-idle": 0,
      "walk-down": { from: 0, to: 3, loop: true },
      "walk-left-down": { from: 4, to: 7, loop: true },
      "walk-left-down-idle": 4,
      "walk-left": { from: 8, to: 11, loop: true },
      "walk-left-idle": 8,
      "walk-left-up": { from: 12, to: 15, loop: true },
      "walk-left-up-idle": 12,
      "walk-up": { from: 16, to: 19, loop: true },
      "walk-up-idle": 16,
      "walk-right-up": { from: 20, to: 23, loop: true },
      "walk-right-up-idle": 20,
      "walk-right": { from: 24, to: 27, loop: true },
      "walk-right-idle": 24,
      "walk-right-down": { from: 28, to: 31, loop: true },
      "walk-right-down-idle": 28,
    },
  });
  // k.loadSprite("player2", "./sprites/player2.png", {
  //   sliceX: 8,
  //   sliceY: 3,
  //   anims: {
  //     "walk-down-idle": 12,
  //     "walk-down": { frames:[4,12,20],from: null, to: null, loop: true },
  //     "walk-left-down": { frames:[5,13,21],from: null, to: null, loop: true },
  //     "walk-left-down-idle": 13,
  //     "walk-left": { frames:[6,14,22], from: null, to: null, loop: true },
  //     "walk-left-idle": 14,
  //     "walk-left-up": { frames:[7,15,23],from: null, to: null, loop: true },
  //     "walk-left-up-idle": 15,
  //     "walk-up": { frames:[0,8,16],from: null, to: null, loop: true },
  //     "walk-up-idle": 8,
  //     "walk-right-up": { frames:[1,9,17],from: null, to: null, loop: true },
  //     "walk-right-up-idle": 9,
  //     "walk-right": { frames:[2,10,18],from: null, to: null, loop: true },
  //     "walk-right-idle": 10,
  //     "walk-right-down": { frames:[3,11,19],from: null, to: null, loop: true },
  //     "walk-right-down-idle": 11,
  //   },
  // });
  k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("resume-logo", "./logos/resume-logo.png");
  k.loadSprite("github-logo", "./logos/github-logo.png");
  k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
  k.loadSprite("x-logo", "./logos/x-logo.png");
  k.loadSprite("substack-logo", "./logos/substack-logo.png");
  k.loadSprite("javascript-logo", "./logos/js-logo.png");
  k.loadSprite("typescript-logo", "./logos/ts-logo.png");
  k.loadSprite("react-logo", "./logos/react-logo.png");
  k.loadSprite("nextjs-logo", "./logos/nextjs-logo.png");
  k.loadSprite("snowflake-logo", "./logos/snowflake-logo.png");
  k.loadSprite("html-logo", "./logos/html-logo.png");
  k.loadSprite("css-logo", "./logos/css-logo.png");
  k.loadSprite("c-sharp-logo", "./logos/c-sharp-logo.png");
  k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
  k.loadSprite("python-logo", "./logos/python-logo.png");
  k.loadSprite("email-logo", "./logos/email-logo.png");
  k.loadSprite("sonic-js", "./projects/sonic-js.png");
  k.loadSprite("kirby-ts", "./projects/kirby-ts.png");
  k.loadSprite("platformer-js", "./projects/platformer-js.png");
  k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

  if (k.width() < 1000) {
    store.set(cameraZoomValueAtom, 0.5);
    k.setCamScale(k.vec2(0.5));
  } else {
    store.set(cameraZoomValueAtom, 0.8);
    k.setCamScale(k.vec2(0.8));
  }

  k.onUpdate(() => {
    const camZoomValue = store.get(cameraZoomValueAtom);
    if (camZoomValue !== k.getCamScale()) k.setCamScale(k.vec2(camZoomValue));
  });

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color3),
      u_color2: k.Color.fromHex(PALETTE.color2),
      u_speed: k.vec2(1, -1),
      u_aspect: k.width() / k.height(),
      u_size: 5,
    })),
    k.pos(0),
    k.fixed(),
  ]);

  k.onResize(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

  makeSection(
    k,
    k.vec2(k.center().x, k.center().y - 400),
    generalData.abtSectionName,
    (parent) => {
      const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

      container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 48 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(550, 0),
        k.opacity(0),
      ]);

      container.add([
        k.text(generalData.header.subtitle, { font: "ibm-bold", size: 38 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(550, 75),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);
      for (const socialData of socialsData) {
        if (socialData.name === "Email") {
          makeEmailIcon(
            k,
            socialContainer,
            k.vec2(socialData.pos.x, socialData.pos.y),
            socialData.logoData,
            socialData.name,
            socialData.address
          );
          continue;
        }
        if (socialData.name === "Resume") {
            makeResumeIcon(
                k,
                socialContainer,
                k.vec2(socialData.pos.x, socialData.pos.y),
                socialData.logoData,
                socialData.name,
                socialData.link,
                socialData.description
            );
            continue;
        }
        makeSocialIcon(
          k,
          socialContainer,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.logoData,
          socialData.name,
          socialData.link,
          socialData.description
        );
      }
      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
  );

  makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    generalData.skillSectionName,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(-300, 0)]);
      for (const skillData of skillsData) {
        makeSkillIcon(
          k,
          container,
          k.vec2(skillData.pos.x, skillData.pos.y),
          skillData.logoData,
          skillData.name
        );
        continue;
      }

      makeAppear(k, container);
    }
  );

  makeSection(
    k,
    k.vec2(k.center().x + 400, k.center().y),
    generalData.expSectionName,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      for (const experienceData of experiencesData) {
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x, experienceData.pos.y),
          experienceData.cardHeight,
          experienceData.roleData
        );
      }
      makeAppear(k, container);
    }
  );

    makeSection(
      k,
      k.vec2(k.center().x, k.center().y + 400),
      generalData.projSectionName,
      (parent) => {
        const container = parent.add([k.opacity(0, k.pos(0))]);
        for (const projectData of projectsData) {
          makeProjectCard(
              k,
              container,
              k.vec2(projectData.pos.x, projectData.pos.y),
              projectData.data,
              projectData.thumbnail
          );
        }
        makeAppear(k, container);
      }
    );

  makePlayer(k, k.vec2(k.center()), 700);
}
