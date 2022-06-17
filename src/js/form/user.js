import React, { Component } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from "../navbar";
import axios from 'axios';

const withRouter = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
        />
    );
};

const endpoint = "user";
const className = "UserForm";
class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                role: {
                    id: 0
                }
            },
            roles: [],
            errorMessage: null
        };
    }

    componentDidMount() {
        if (this.props.params.id) {
            this.setState({
                update: true,
                id: this.props.params.id,
            });
            axios
                .get("https://devappcorp.herokuapp.com/api/" + endpoint + "/" + this.props.params.id)
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        obj: response.data,
                        errorMessage: null
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        errorMessage: "Não foi possível obter o objeto",
                    });
                });
        }
        axios
            .get("https://devappcorp.herokuapp.com/api/role")
            .then((response) => {
                console.log(response.data);
                if (this.props.params.id) {
                    this.setState({
                        roles: response.data,
                        errorMessage: null
                    });
                } else {
                    this.setState({
                        roles: response.data,
                        errorMessage: null,
                        obj: {
                            role: response.data[0]
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: "Não foi possível obter o objeto",
                });
            });
    }

    submitForm() {
        var action = this.state.update ? axios.put : axios.post;
        var urlId = this.state.update ? this.state.id : "";

        var obj = this.state.obj;
        this.state.roles.forEach((role) => {
            if (obj.role.id === role.id)
                obj.role = role;
        });

        if (!this.state.update)
            obj.forceUpdate = true;

        console.log(obj);

        action("https://devappcorp.herokuapp.com/api/" + endpoint + "/" + urlId, obj)
            .then((response) => {
                console.log(response.data);
                this.props.navigate("/" + endpoint);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: "Não foi criar ou atualizar o objeto",
                });
            });
    }

    render() {
        return (
            <div className={className}>
                <Navbar active={"/" + endpoint} />
                <div className="Priv-Form">
                    <div className="py-5">
                        <div className="container">
                            {this.state.errorMessage &&
                                this.state.errorMessage != null && (
                                    <div className="d-flex justify-content-center alert-box">
                                        <div
                                            className="alert alert-danger w-100 p-3 d-flex justify-content-center"
                                            role="alert"
                                        >
                                            {this.state.errorMessage}
                                        </div>
                                    </div>
                                )}
                            <br />
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="username">
                                        <b> Username </b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        autoComplete="off"
                                        value={this.state.obj.username}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    username: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">
                                        <b> Função </b>
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="form-control"
                                        value={this.state.obj.role.id}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    role: {
                                                        ...prevState.role,
                                                        id: e.target.value
                                                    }
                                                },
                                            }))
                                        }
                                    >
                                         {this.state.roles.map((option) => (
                                            <option value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {this.state.update && <div className="form-group">
                                    <label htmlFor="update">
                                        <b> Senha inválida </b>
                                    </label>
                                    <select
                                        name="update"
                                        id="update"
                                        className="form-control"
                                        value={this.state.obj.forceUpdate}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    forceUpdate: e.target.value,
                                                },
                                            }))
                                        }
                                    >
                                        <option value={true}>
                                            Sim
                                        </option>
                                        <option value={false}>
                                            Não
                                        </option>
                                    </select>
                                </div>}
                                {!this.state.update && 
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <b> Senha </b>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Senha"
                                        autoComplete="off"
                                        value={this.state.obj.password}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    password: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    ></input>
                                </div>}
                            </form>
                            <br />
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success text-white"
                                    onClick={() => {
                                        this.submitForm();
                                    }}
                                >
                                    <b>Confirmar</b>
                                </button>
                                <Link
                                    type="button"
                                    style={{ margin: "0 5px" }}
                                    className="btn btn-danger text-white"
                                    to={"/" + endpoint}
                                >
                                    <b>Cancelar</b>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserForm);