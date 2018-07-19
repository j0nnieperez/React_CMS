import React, {Component} from 'react'
import DataBaseModel from '../../Models/DatabaseModel'
import { 
    Container, Row, Col, Card, 
    CardBody, CardTitle, 
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from '../Common/Modal'
import { addTable, addDatabase } from '../../Actions'

class AdminDatabase extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal:false,
            ModalTitle:"",
            ModalMessage:""
        }
        this.toggle = this.toggle.bind(this)
    }

    async componentDidMount(){
        try {
            if(this.props.Databases.length === 0){
                const DatabaseInfo = await DataBaseModel.GetInfo()
                if(DatabaseInfo.success){
                    DatabaseInfo.databases.map((database) => {
                        this.props.addDatabase({name: database.name, id:database.id})
                        database.tables.map(table => {
                            this.props.addDBTable({...table, DatabaseId:database.id})
                            return true
                        })
                        return true
                    })
                }else{
                    this.setState({modal:true, ModalTitle:"Alerta", ModalMessage:DatabaseInfo.message})
                }
            }
        } catch (error) {
            console.log(error)
            this.setState({modal:true, ModalTitle:"Alerta", ModalMessage:"No es posible conectar al servidor"})
        }
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    render(){
        return (
            <div className="AdminDatabase" >
                <h2 className="Title" >Administrar Bases de Datos</h2>
                {this.props.Databases.map((database, index) => 
                    <Container key={index} className="DatabaseInfo Father" >
                        <h3 className="DatabaseName" >{database.name.toUpperCase()}</h3>
                        <Row>
                            {this.props.DatabaseTables
                            .filter(table => table.DatabaseId === database.id)
                            .map((table, table_index) =>
                                <Col key={table_index} xs="3" >
                                    <Card>
                                        <CardBody>
                                            <CardTitle>{table.name}</CardTitle>
                                            <ul className="TablesFields" >
                                                {table.fields.slice(0,5).map((field, field_index) => 
                                                    <li key={field_index} >
                                                        <b>{field.Field}: </b>
                                                        {field.Type}
                                                    </li>
                                                )}
                                                <li>...</li>
                                            </ul>
                                            <Link to={`/admin/database/table?name=${table.name}`}>
                                            <Button>Ver tabla</Button>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )}
                            <Col xs="3" >
                                <Card className="AddTable" >
                                    <CardBody>
                                        <CardTitle>Agregar Tabla</CardTitle>
                                        <Button>
                                            <span className="icon-add" />
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
                <Modal show={this.state.modal} modalTitle={this.state.ModalTitle} modalBody={this.state.ModalMessage}  />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Databases: state.Databases,
    DatabaseTables: state.DatabaseTables
})

const mapDispatchToProps = dispatch => ({
    addDBTable: table => {
        dispatch( addTable(table) )
    },
    addDatabase: database => {
        dispatch( addDatabase(database) )
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDatabase)