import { useAtomValue, useAtom } from "jotai";
import { chosenProjectDataAtom, isProjectModalVisibleAtom } from "../store";

export default function ProjectModal() {
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);
  const projectData = useAtomValue(chosenProjectDataAtom);

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>{projectData.title}</h1>
          <div className="modal-btn-container">
            {projectData.links.map((linkData) => (
              <button
                key={linkData.id}
                className="modal-btn"
                onClick={() => {
                  window.open(linkData.link, "_blank");
                }}
              >
                {linkData.name}
              </button>
            ))}
            <button
              className="modal-btn"
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
