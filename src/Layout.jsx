// eslint-disable-next-line no-unused-vars
import React from 'react';
import App from './App.jsx';
import { Route, Routes } from 'react-router-dom';
import { LogInPage } from './components/loginPage/LogInPage.jsx';
import { RegisterPage } from './components/registerPage/RegisterPage.jsx';
import { HomePage } from './components/homePage/HomePage.jsx';
import { ForgotPwdPage } from './components/forgotPwdPass/ForgotPwdPage.jsx';
import { ToastContainer } from 'react-toastify';
import { UserPage } from './components/userPage/UserPage.jsx';
import { Profile } from './components/userPage/Profile.jsx';
import { Collections } from './components/userPage/Collections.jsx';
import { ChangePwdForm } from './components/userPage/ChangePwdForm.jsx';
import { SearchPage } from './components/searchPage/SearchPage.jsx';
import { AuthorPage } from './components/authorPage/AuthorPage.jsx';
import { InforPage } from './components/inforPage/InforPage.jsx';
import { ReadingPage } from './components/readingPage/ReadingPage.jsx';
import { AdminPage } from './components/adminPage/AdminPage.jsx';
import { AdminRule } from './components/adminPage/AdminRule.jsx';
import { SearchUser } from './components/adminPage/userList/SearchUser.jsx';
import { AdminList } from './components/adminPage/AdminList.jsx';
import { Author } from './components/adminPage/author/Author.jsx';
import { UpdateAuthor } from './components/adminPage/author/UpdateAuthor.jsx';
import { AddAuthor } from './components/adminPage/author/AddAuthor.jsx';
import { UpdateUser } from './components/adminPage/userList/UpdateUser.jsx';
import { UploadPage } from './components/upLoadPage/UploadPage.jsx';
import { UploadRule } from './components/upLoadPage/UploadRule.jsx';
import { AddNovel } from './components/upLoadPage/AddNovel.jsx';
import { MyNovel } from './components/upLoadPage/MyNovel.jsx';
import { UpdateNovel } from './components/upLoadPage/UpdateNovel.jsx';
import { ChapterList } from './components/upLoadPage/ChapterList.jsx';
import { UpdateChapter } from './components/upLoadPage/chapter/UpdateChapter.jsx';
import { AddChapter } from './components/upLoadPage/chapter/AddChapter.jsx';
import { NotFound } from './components/404Page/NotFound.jsx';
export const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="novel/search" element={<SearchPage />} />
                    <Route path="user" element={<UserPage />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="change-password" element={<ChangePwdForm />} />
                        <Route path="my-collection" element={<Collections />} />
                    </Route>
                </Route>

                <Route path="author/:aId" element={<AuthorPage />} />
                <Route path="up-load" element={<UploadPage />}>
                    <Route index element={<UploadRule />}></Route>
                    <Route path="new-novel" element={<AddNovel />}></Route>
                    <Route path="my-novel" element={<MyNovel />}></Route>
                    <Route path="my-novel/:nId" element={<UpdateNovel />}></Route>
                    <Route path="my-novel/update-chapter/:nId/:cId" element={<UpdateChapter></UpdateChapter>}></Route>
                    <Route path="my-novel/chapter-list/:nId" element={<ChapterList />}></Route>
                    <Route path="my-novel/add-chapter/:nId" element={<AddChapter />}></Route>
                </Route>
                <Route path="admin" element={<AdminPage />}>
                    <Route index element={<AdminRule></AdminRule>}></Route>
                    <Route path="search" element={<SearchUser />}></Route>
                    <Route path="ads" element={<AdminList />}></Route>
                    <Route path="author" element={<Author />}></Route>
                    <Route path="author/:aId" element={<UpdateAuthor />}></Route>
                    <Route path="author/add-new" element={<AddAuthor />}></Route>
                    <Route path="search/:uId" element={<UpdateUser />}></Route>
                </Route>
                <Route path="novel/:nSlug" element={<InforPage />}></Route>
                <Route path="novel/:nSlug/:cSlug" element={<ReadingPage />}></Route>

                <Route path="log-in" element={<LogInPage />}></Route>
                <Route path="register" element={<RegisterPage />}></Route>
                <Route path="forgot-pwd" element={<ForgotPwdPage />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            <ToastContainer />
        </>
    );
};
