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

const endpoint = "sysvar";
const className = "SysvarForm";
class SysvarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                systemVariableType: {
                    id: 0
                }
            },
            sysvartypes: [],
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
            .get("https://devappcorp.herokuapp.com/api/sysvartype")
            .then((response) => {
                console.log(response.data);
                if (this.props.params.id) {
                    this.setState({
                        sysvartypes: response.data,
                        errorMessage: null
                    });
                } else {
                    this.setState({
                        sysvartypes: response.data,
                        errorMessage: null,
                        obj: {
                            systemVariableType: response.data[0]
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
        this.state.sysvartypes.forEach((systemVariableType) => {
            if (obj.systemVariableType.id === systemVariableType.id) 
                obj.systemVariableType = systemVariableType;
        });

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
                                    <label htmlFor="name">
                                        <b> Nome </b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="Nome"
                                        autoComplete="off"
                                        value={this.state.obj.name}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    name: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="value">
                                        <b> Valor </b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="value"
                                        id="value"
                                        placeholder="Valor"
                                        autoComplete="off"
                                        value={this.state.obj.value}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    value: e.target.value,
                                                },
                                            }))
                                        }
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sysvartype">
                                        <b> Tipo de variável </b>
                                    </label>
                                    <select
                                        name="sysvartype"
                                        id="sysvartype"
                                        className="form-control"
                                        value={this.state.obj.systemVariableType.id}
                                        onChange={(e) =>
                                            this.setState((prevState) => ({
                                                obj: {
                                                    ...prevState.obj,
                                                    systemVariableType: {
                                                        ...prevState.role,
                                                        id: e.target.value
                                                    }
                                                },
                                            }))
                                        }
                                    >
                                         {this.state.sysvartypes.map((option) => (
                                            <option value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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

export default withRouter(SysvarForm);