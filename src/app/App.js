import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Nav from './routes/NavBar';
import GetAllArticles from '../feature/articles/getArticles/GetAllArticlesComponent';
import GetSingleArticle from '../feature/articles/getSingleArticle/GetSingleArticleComponent';
import CreateArticle from '../feature/articles/createArticle/CreateArticleComponent';
import ProtectedRoutes from '../feature/protectedRoutes/ProtectedRoutesComponent';
import SignUp from '../feature/auth/signup/SignUpComponent';
import Login from '../feature/auth/login/LoginComponent';
import Profile from '../feature/profile/view_profile/ViewProfileComponent';
import UpdateProfile from '../feature/profile/update_profile/UpdateProfileComponent';
import ForgotPassword from '../feature/Reset Password/forgot password/ForgotPasswordComponent';
import ResetPassword from '../feature/Reset Password/reset password/ResetPasswordComponent';
import UpdateArticle from '../feature/articles/updateArticle/UpdateArticleComponent';
import Search from '../feature/articles/SearchArticle/SearchComponent';
import Bookmarks from '../feature/bookmark/BookmarksListComponent';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

toast.configure();
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Nav />
        </header>
        <ToastContainer />
        <Switch>
          <section className="App-body">
            <Route path="/forgot" component={ForgotPassword} />
            <Route
              path="/users/reset-password/:token"
              component={ResetPassword}
            />
            <Route exact path="/" component={GetAllArticles} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/profile/:userName" component={Profile} />
            <Route path="/update-profile" component={UpdateProfile} />
            <Route exact path="/articles/:slug" component={GetSingleArticle} />
            <Route path="/bookmarks" component={Bookmarks} />
            <ProtectedRoutes path="/create" component={CreateArticle} />
            <ProtectedRoutes path="/article/:slug/update" component={UpdateArticle} />
            <Route path="/search" component={Search} />
          </section>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
