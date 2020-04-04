import React, {Component} from 'react';
import axios from 'axios'
import './../App/Layout/styles.css';
import {Header, Icon, List, Search, Container} from 'semantic-ui-react'

class ValuesComponent extends Component {
    /**
     *
     */
    
    state = {
      values : [],
      search : ""
    };

    constructor(props : any) {
      super(props);
        
      this.state = {
        values : [],
        search : ""
      }

    }
    
    
    updateSearch(event : any) {
        let t = event.target as HTMLInputElement;
        let value = t.value;
        this.setState({
          search : value.substr(0, 20)
        });
    }

      //LifeCycle
    componentDidMount() {
        
        axios.get("http://localhost:5000/api/values")
          .then((response) => {
            this.setState({
              values: response.data
            });
          })
      }

    render() {
      let filtered = this.state.values.filter(
        (value : any) => {
          return value.name.toLowerCase().indexOf(this.state.search) !== -1;
        }
      );
        return (
            <Container>
              <Header as='h2'>
                  <Icon name='plug'/>
                  <Header.Content className="swag">Values</Header.Content>
              </Header>
              <List>
                  {filtered.map(
                    (value : any) => (
                      <List.Item key={value.id}>{value.name}</List.Item>
                      )
                      )}
              </List>
              <Search 
                value={this.state.search}
                onSearchChange={this.updateSearch.bind(this)}>
              </Search>
            </Container>
        );
    }

}

export default ValuesComponent