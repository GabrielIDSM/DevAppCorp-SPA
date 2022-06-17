import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './js/home';
import { Image } from './js/image';
import { Role } from './js/role';
import { Service } from './js/service';
import { Sysvar } from './js/sysvar';
import { Sysvartype } from './js/sysvartype';
import { User } from './js/user';
import { Userlog } from './js/userlog';

import ImageForm from './js/form/image';
import RoleForm from './js/form/role';
import ServiceForm from './js/form/service';
import SysvarForm from './js/form/sysvar';
import SysvartypeForm from './js/form/sysvartype';
import UserForm from './js/form/user';

import "./index.css";
import "./css/home.css";
import "./css/image.css";
import "./css/navbar.css";
import "./css/role.css";
import "./css/service.css";
import "./css/sysvar.css";
import "./css/sysvartype.css";
import "./css/user.css";
import "./css/userlog.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router basename='/'>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/userlog" element={<Userlog/>} />

                    <Route path="/image" element={<Image/>} />
                    <Route path="/role" element={<Role/>} />
                    <Route path="/service" element={<Service/>} />
                    <Route path="/sysvar" element={<Sysvar/>} />
                    <Route path="/sysvartype" element={<Sysvartype/>} />
                    <Route path="/user" element={<User/>} />
                    
                    <Route path="/image-new" element={<ImageForm/>} />
                    <Route path="/role-new" element={<RoleForm/>} />
                    <Route path="/service-new" element={<ServiceForm/>} />
                    <Route path="/sysvar-new" element={<SysvarForm/>} />
                    <Route path="/sysvartype-new" element={<SysvartypeForm/>} />
                    <Route path="/user-new" element={<UserForm/>} />
                    
                    <Route path="/image-edit/:id" element={<ImageForm/>} />
                    <Route path="/role-edit/:id" element={<RoleForm/>} />
                    <Route path="/service-edit/:id" element={<ServiceForm/>} />
                    <Route path="/sysvar-edit/:id" element={<SysvarForm/>} />
                    <Route path="/sysvartype-edit/:id" element={<SysvartypeForm/>} />
                    <Route path="/user-edit/:id" element={<UserForm/>} />
                </Routes>
            </div>
        </Router>
    </React.StrictMode>
);