import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Facebook,
  Reddit,
  Linkedin,
  Twitter,
  ShareIcon,
} from 'components/icons';
import ShareComp from './ShareComp';
import { Widget } from 'components/actions';

const Share = ({ title }) => {
  const router = useRouter();

  useEffect(() => {
    if (navigator.share) {
      document.getElementById('share-native').removeAttribute('hidden');
    }
  }, []);

  function shareButtonHandler() {
    // check if web share api is supported
    if (navigator.share) {
      navigator.share({
        text: title,
        url: `https://girleducation.in/datasets/${router.query.explorer}`,
      });
    }
  }

  return (
    <>
      <Widget
        icon={<ShareIcon />}
        buttonContent="Share"
        title="share menu"
        buttonStyle="secondary-outline"
      >
        <ShareComp className="shareModal__dropdown">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.facebook.com/sharer.php?u=https://girleducation.in/datasets/${router.query.explorer}`}
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
              href={`https://twitter.com/intent/tweet?url=https://girleducation.in/datasets/${router.query.explorer}`}
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
              href={`https://www.linkedin.com/shareArticle?url=https://girleducation.in/datasets/${router.query.explorer}`}
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
              href={`https://www.reddit.com/submit?url=https://girleducation.in/datasets/${router.query.explorer}`}
            >
              <Reddit />
              <span>Reddit</span>
              <span className="sr-only"> :opens in new window</span>
            </a>
          </li>
          <li id="share-native" hidden>
            <button onClick={() => shareButtonHandler()}>
              <Reddit />
              <span>Share via...</span>
            </button>
          </li>
        </ShareComp>
      </Widget>
    </>
  );
};

export default Share;
