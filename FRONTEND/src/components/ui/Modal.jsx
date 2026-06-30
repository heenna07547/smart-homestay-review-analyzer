/**
 * Props:
 * isOpen: boolean
 * children: ReactNode
 */

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      {children}
    </div>
  );
}

export default Modal;