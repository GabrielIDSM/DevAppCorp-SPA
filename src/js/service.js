import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Navbar } from "./navbar";
import axios from 'axios';

const endpoint = "service";
const className = "Service";
class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objList: [],
            errorMessage: null
        };
    }

    componentDidMount() {
        axios
            .get(
                "https://devappcorp.herokuapp.com/api/" + endpoint
            )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    objList: response.data
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: "Não foi possível obter a listagem"
                });
            });
    }

    deleteObj(id) {
        axios
            .delete(
                "https://devappcorp.herokuapp.com/api/" + endpoint + "/" + id
            )
            .then((response) => {
                axios
                    .get(
                        "https://devappcorp.herokuapp.com/api/" + endpoint
                    )
                    .then((iResponse) => {
                        console.log(iResponse.data);
                        iResponse.data.forEach((obj) => {
                            if (parseInt(obj.id) === parseInt(id)) {
                                this.setState({
                                    errorMessage: "Não foi possível excluir o item. id: " + id
                                });
                            }
                        })
                        this.setState({
                            objList: iResponse.data
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            errorMessage: "Não foi possível obter a listagem"
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: "Não foi possível se conectar a API"
                });
            });
    }

    render() {
        return (
            <div className={className}>
                <Navbar active={"/" + endpoint} />
                <div className="Priv-Form-List">
                    <div className="py-5">
                        <div className="container">
                            {this.state.errorMessage && this.state.errorMessage != null &&
                                <div className="d-flex justify-content-center alert-box">
                                    <div
                                        className="alert alert-danger w-100 p-3 d-flex justify-content-center"
                                        role="alert"
                                    >
                                        {this.state.errorMessage}
                                    </div>
                                </div>
                            }
                            <br />
                            <Link
                                type="button"
                                className="btn btn-success text-white"
                                to={"/" + endpoint + "-new/"}
                            >
                                <b>Criar</b>
                            </Link>
                            <br />
                            <br />
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Imagem</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.objList.map((obj) => (
                                        <tr key={obj.id}>
                                            <td>{obj.id}</td>
                                            <td>{obj.name}</td>
                                            <td>{obj.image.fileName}</td>
                                            <td>
                                                <Link
                                                    type="button"
                                                    className="btn btn-primary text-white"
                                                    key={obj.id}
                                                    to={
                                                        "/" + endpoint + "-edit/" +
                                                        obj.id
                                                    }
                                                >
                                                    <b>Editar</b>
                                                </Link>
                                                <button
                                                    type="button"
                                                    style={{ margin: "0 5px" }}
                                                    className="btn btn-danger text-white"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Deletar "' +
                                                                    obj.name +
                                                                    '"?'
                                                            )
                                                        )
                                                            this.deleteObj(
                                                                obj.id
                                                            );
                                                    }}
                                                >
                                                    <b>Excluir</b>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Service };