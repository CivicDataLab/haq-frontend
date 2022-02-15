import React, { useEffect } from 'react';
import { Share } from 'icons/ExplorerIcons';
import { useRouter } from 'next/router';
import { Facebook, Reddit, Linkedin, Twitter } from 'icons/ExplorerIcons';
import ShareComp from './ShareComp';
import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import Widget from 'components/Widget/Widget';

const ShareModal = ({ title }) => {
  const router = useRouter();

  useEffect(() => {
    if (navigator.share) {
      document.getElementById('share-native').removeAttribute('hidden');
      document
        .getElementById('shareComp-custom')
        .setAttribute('hidden', 'true');
    }
  }, []);

  // open / close sub-menu
  function shareButtonHandler() {
    // check if web share api is supported
    if (navigator.share) {
      navigator.share({
        text: title,
        url: `https://budgets.justicehub.in/datasets/${router.query.explorer}`,
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => shareButtonHandler()}
        kind="primary-outline"
        aria-label={`Show share menu`}
        id="share-native"
        hidden
      >
        Share <Share />
      </Button>
      <Widget
        buttonContent={
          <>
            Share <Share />
          </>
        }
        title="share menu"
        buttonStyle="primary-outline"
      >
        <ShareComp className="shareModal__dropdown">
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
        </ShareComp>
      </Widget>
    </>
  );
};

export default ShareModal;
