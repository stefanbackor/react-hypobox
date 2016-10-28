import React from 'react';

// import messages from './messages';
import A from 'components/A';
import styles from './styles.css';
// import { FormattedMessage } from 'react-intl';
// import LocaleToggle from 'containers/LocaleToggle';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>
          Výpočet má informatívny charakter. Autor nenesie zodpovednosť za prípadné nepresnosti. <br />
          Všetky práva vyhradené - <A href="mailto:stevo@backor.sk">stevo@backor.sk</A>
          {/* <FormattedMessage {...messages.licenseMessage} /> */}
        </p>
      </section>
      {/* <section>
        <LocaleToggle />
      </section> */ }
      <section>
        <p>
          {/* <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href="https://backor.sk">Števo Bačkor</A>,
            }}
          /> */}
        </p>
      </section>
    </footer>
  );
}

export default Footer;
