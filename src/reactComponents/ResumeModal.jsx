import { useAtom, useAtomValue } from "jotai";
import { isResumeModalVisibleAtom, selectedLinkAtom } from "../store";

export default function SocialModal() {
  const [isVisible, setIsVisible] = useAtom(isResumeModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkAtom);

  const buttons = [
    {
      id: 0,
      name: "Yes",
      handler: () => {
        window.open(selectedLink, "_blank");
        setIsVisible(false);
      },
    },
    {
      id: 1,
      name: "No",
      handler: () => {
        setIsVisible(false);
      },
    },
  ];
  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>Would you like to download a copy of my resume?</h1>
          <div className="modal-btn-container">
            {buttons.map((button) => (
              <button
                key={button.id}
                className="modal-btn"
                onClick={button.handler}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
