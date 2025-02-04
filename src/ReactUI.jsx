import CameraController from "./reactComponents/CameraController";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";
import SocialModal from "./reactComponents/SocialModal";
import ResumeModal from "./reactComponents/ResumeModal";

export default function ReactUI() {
    return (
    <>
        <p className="controls-message">Tap/Click around to move</p>
        <CameraController />
        <SocialModal />
        <ResumeModal />
        <EmailModal />
        {/* <ProjectModal /> */}
    </>
    )
}