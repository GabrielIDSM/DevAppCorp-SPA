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

const endpoint = "image";
const className = "ImageForm";
class ImageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
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
    }

    submitForm() {
        var action = this.state.update ? axios.put : axios.post;
        var urlId = this.state.update ? this.state.id : "";
        action("https://devappcorp.herokuapp.com/api/" + endpoint + "/" + urlId, this.state.obj)
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
                            {this.state.obj && <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="fileName">
                                        <b> Nome do arquivo </b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fileName"
                                        id="fileName"
                                        placeholder="Nome do arquivo"
                                        autoComplete="off"
                                        value={this.state.obj.fileName}
                                        onChange={e => this.setState(prevState => ({
                                            obj: {
                                                ...prevState.obj,
                                                fileName: e.target.value
                                            }
                                        }))}
                                        required
                                    ></input>
                                </div>
                            </form>}
                            <br />
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success text-white"
                                    onClick={() => {this.submitForm()}}
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

export default withRouter(ImageForm);