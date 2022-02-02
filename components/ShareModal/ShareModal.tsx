import { Share } from 'icons/ExplorerIcons';
import { useRouter } from 'next/router';
import {
  Facebook,
  Reddit,
  Linkedin,
  Twitter,
} from 'icons/ExplorerIcons';
import ShareComp from './ShareComp';

const ShareModal = ({ title }) => {
  const router = useRouter();

  // open / close sub-menu
  function shareButtonHandler(e: any) {
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

    // check if web share api is supported
    if (navigator.share) {
      navigator.share({
        text: title,
        url: `https://budgets.justicehub.in/datasets/${router.query.explorer}`,
      });
    } else {
      // if clicked on already opened menu, close
      if (e.target.getAttribute('aria-expanded') == 'true') {
        hideMenu();
      } else {
        // if not open, then open current clicked menu
        showMenu();
      }
    }
  }

  return (
    <ShareComp className="shareModal">
      <button
        className="btn-secondary-invert"
        type="button"
        aria-controls="submenu__resources"
        aria-expanded="false"
        aria-label={`Show share menu`}
        data-text-for-show={`Show share menu`}
        data-text-for-hide={`Hide share menu`}
        onClick={shareButtonHandler}
      >
        Share <Share />
      </button>
      <ul className="shareModal__dropdown" hidden>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer.php?u=https://budgets.justicehub.in/datasets/${router.query.explorer}`}
          >
            <Facebook />
            <span>Facebook</span>
            <span className="sr-only"> :opens in new window</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?url=https://budgets.justicehub.in/datasets/${router.query.explorer}`}
          >
            <Twitter />
            <span>Twitter</span>
            <span className="sr-only"> :opens in new window</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.linkedin.com/shareArticle?url=https://budgets.justicehub.in/datasets/${router.query.explorer}`}
          >
            <Linkedin />
            <span>LinkedIn</span>
            <span className="sr-only"> :opens in new window</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.reddit.com/submit?url=https://budgets.justicehub.in/datasets/${router.query.explorer}`}
          >
            <Reddit />
            <span>Reddit</span>
            <span className="sr-only"> :opens in new window</span>
          </a>
        </li>
      </ul>
    </ShareComp>
  );
};

export default ShareModal;
