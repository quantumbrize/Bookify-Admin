export type ModalType = 'warning' | 'success' | 'error';
export default interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    title: string;
    message: any;
  }