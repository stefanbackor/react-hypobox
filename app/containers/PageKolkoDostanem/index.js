/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';

import {
  // selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

// import {
//   selectUsername,
// } from './selectors';

// import { changeUsername } from './actions';
// import { loadRepos } from '../App/actions';

import { FormattedMessage } from 'react-intl';
// import RepoListItem from 'containers/RepoListItem';
// import Button from 'components/Button';
import H2 from 'components/H2';
// import List from 'components/List';
// import ListItem from 'components/ListItem';
// import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

import HBCalcHowMuch from 'containers/HBCalcHowMuch';

export class PageKolkoDostanem extends React.Component {

  // /**
  //  * when initial state username is not null, submit the form to load repos
  //  */
  // componentDidMount() {
  //   if (this.props.username && this.props.username.trim().length > 0) {
  //     this.props.onSubmitForm();
  //   }
  // }
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  render() {
    return (
      <article>
        <Helmet
          title="Akú hypotéku dostanem?"
          meta={[
            { name: 'description', content: 'Kalkulačka pre výpočet výšky hypotéky.' },
          ]}
        />
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </section>
          <section>
            <HBCalcHowMuch />
          </section>
        </div>
      </article>
    );
  }
}

PageKolkoDostanem.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  // repos: React.PropTypes.oneOfType([
  //   React.PropTypes.array,
  //   React.PropTypes.bool,
  // ]),
  // onSubmitForm: React.PropTypes.func,
  // username: React.PropTypes.string,
  // onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    // onSubmitForm: (evt) => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    // },

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: selectRepos(),
  // username: selectUsername(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PageKolkoDostanem);
