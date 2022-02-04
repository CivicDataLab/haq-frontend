import { Share } from 'icons/ExplorerIcons';
import DialogComp from './DialogComp';
import Button from 'components/Button/Button';

interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Button Content
   */
  buttonContent: React.ReactNode;
  /**
   * Button title
   */
  title: string;
  /**
   * Button style
   */
  buttonStyle:
    | 'primary'
    | 'secondary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'custom';
}

const Dialog = ({
  children,
  buttonContent,
  title,
  buttonStyle = 'primary-outline',
}: DialogProps) => {
  // open / close sub-menu
  function dialogButtonHandler(e: any) {
    function hideMenu() {
      e.target.setAttribute('aria-expanded', 'false');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-show')
      );
      if (e.target.nextElementSibling)
        e.target.nextElementSibling.setAttribute('hidden', 'true');
    }

    function showMenu() {
      e.target.setAttribute('aria-expanded', 'true');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-hide')
      );
      if (e.target.nextElementSibling)
        e.target.nextElementSibling.removeAttribute('hidden');
    }

    // if clicked on already opened menu, close
    if (e.target.getAttribute('aria-expanded') == 'true') {
      hideMenu();
    } else {
      // if not open, then open current clicked menu
      showMenu();
    }
  }

  return (
    <DialogComp>
      <Button
        onClick={(e) => dialogButtonHandler(e)}
        kind={buttonStyle}
        aria-expanded="false"
        aria-label={`Show ${title}`}
        data-text-for-show={`Show ${title}`}
        data-text-for-hide={`Hide ${title}`}
      >
        {buttonContent}
      </Button>
      <div className="shareModal__dropdown" hidden>
        {children}
      </div>
    </DialogComp>
  );
};

export default Dialog;
