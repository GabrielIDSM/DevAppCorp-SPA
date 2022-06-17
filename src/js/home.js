import React, { Component } from "react";
import { Navbar } from "./navbar";
import axios from 'axios';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            errorMessage: null
        };
    }

    componentDidMount() {
        axios
            .get("https://devappcorp.herokuapp.com/api/servicehistory/last")
            .then((response) => {
                console.log(response.data);
                var data = [];
                response.data.forEach((hist) => {
                    if (hist.complaints < 5)
                        hist.style = "ok";
                    else if (hist.complaints < 25)
                        hist.style = "warning";
                    else if (hist.complaints < 50)
                        hist.style = "danger";
                    else if (hist.complaints < 100)
                        hist.style = "critical";
                    else
                        hist.style = "failed";
                    data.push(hist);
                })
                data.sort(function (a, b) {
                    return b.complaints - a.complaints;
                });
                this.setState({
                    serviceList: data,
                    errorMessage: null
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: "Não foi possível obter a lista",
                });
            });
    }

    render() {
        return (
            <div className="Home">
                <Navbar active="/" />
                <div className="album py-5 bg-light">
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
                        <div className="Home-main text-center">
                            <p className="Home-main-title">
                                Não sabe se o Facebook caiu ou seu celular está com problemas? O Is down? pode te ajudar!
                            </p>
                            <p className="Home-main-content">
                                O Is down? é uma ferramenta de monitoramento de serviços da internet - como redes sociais, 
                                aplicativos de mensagens e jogos - que utiliza de comentários de mais de <b>335 milhões de usuários </b> 
                                para saber se está tendo algum problema ou se está tudo certo.
                            </p>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 g-3">
                            {this.state.serviceList.map((serviceHist) => (
                                <div key={serviceHist.service.id} style={{marginBottom:"20px"}} className="col-sm-6">
                                    <div className="card Home-card">
                                        <div className="card-body Home-card-body text-center">
                                            <div className={"Home-card-box Home-card-box-" + serviceHist.style}>
                                                <div>
                                                    <p>{serviceHist.complaints === 100 ? "+100" : serviceHist.complaints} reclamações</p>
                                                </div>
                                            </div>
                                            <div className="Home-card-image-box"><img className="Home-card-image" alt="logo" src={images[serviceHist.service.image.fileName]} /></div>
                                            <h5 className="card-title">{serviceHist.service.name}</h5>
                                            <p style={{marginBottom: "10px"}} className="card-text">Última atualização em {new Date(serviceHist.collectionTimestamp).toLocaleString("pt-BR", {timeZoneName: "short"})}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Home };