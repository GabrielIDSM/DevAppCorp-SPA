import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from "../img/logo.svg";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{"backgroundColor":"#400000"}}>
                <Link className={this.props.active === "/" ? "nav-link active" : "nav-link"} to="/"><img height="30" className="d-inline-block align-top" src={logo} alt="logo"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav mr-auto">
                        <li className={this.props.active === "/" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/" ? "nav-link active" : "nav-link"} to="/"> Início </Link>
                        </li>
                        <li className={this.props.active === "/image" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/image" ? "nav-link active" : "nav-link"} to="/image"> Imagens </Link>
                        </li>
                        <li className={this.props.active === "/role" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/role" ? "nav-link active" : "nav-link"} to="/role"> Funções </Link>
                        </li>
                        <li className={this.props.active === "/service" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/service" ? "nav-link active" : "nav-link"} to="/service"> Serviços </Link>
                        </li>
                        <li className={this.props.active === "/sysvar" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/sysvar" ? "nav-link active" : "nav-link"} to="/sysvar"> Variáveis </Link>
                        </li>
                        <li className={this.props.active === "/sysvartype" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/sysvartype" ? "nav-link active" : "nav-link"} to="/sysvartype"> Tipo de variáveis </Link>
                        </li>
                        <li className={this.props.active === "/user" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/user" ? "nav-link active" : "nav-link"} to="/user"> Usuários </Link>
                        </li>
                        <li className={this.props.active === "/userlog" ? "nav-item active" : "nav-item"}>
                            <Link className={this.props.active === "/userlog" ? "nav-link active" : "nav-link"} to="/userlog"> Registro de acesso </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export { Navbar }