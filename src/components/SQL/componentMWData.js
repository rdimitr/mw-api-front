import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const MW_API_URL = process.env.REACT_APP_MW_API_URL;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ComponentMWData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
            items: [],
            isLoaded: false,
            error: null,
            idCard: 0
    };
  }

  async componentDidMount() {
    let errString = "Данные для документов не найдены"
    try {
        const response = await fetch(MW_API_URL + this.props.idCard);
        const responseMW = await response.json();
      
        if ( responseMW.hasOwnProperty('error') ) {
            throw errString;
        }  
        else {
            this.setState({
                 isLoaded: true,
                 items: responseMW
            });
        }
    } catch (error) {
              this.setState({
                    isLoaded: true,
                    error
              });
              console.error('Ошибка:', error);
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>{error} {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } 
    else {
        return (
          <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Дата/время действия</StyledTableCell>
                <StyledTableCell align="center">Дескриптор ЕГИСЗ</StyledTableCell>
                <StyledTableCell align="center">ID статуса</StyledTableCell>
                <StyledTableCell align="center">Описание статуса</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((items_row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{items_row.status_date}</TableCell>
                  <TableCell align="left">{items_row.egiszAction}</TableCell>
                  <TableCell align="center">{items_row.statusID}</TableCell>
                  <TableCell align="left">{items_row.NameStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        );
    }
  }
}

export default ComponentMWData;