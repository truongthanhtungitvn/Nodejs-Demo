import React, { Component } from 'react';
import Loading from './loading';
// import sweetalert2 from 'sweetalert2'
var htmlparser = require("htmlparser2");
var validUrl = require('valid-url');
let spec = []

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url1: 'http://www.lazada.sg/apple-iphone-7-plus-128gb-jet-black-8629928.html',
            url2: 'http://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html',
            handling: 0
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.mappingData = this.mappingData.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    handleChange1(event) {
        let u = event.target.value
        this.setState({url1: u});
    }

    handleChange2(event) {
        let u = event.target.value
        this.setState({url2: u});
    }

    mappingData(){
        let a1 = []
        let a2 = []
        let data1 = []
        let data2 = []
        let fulldata = []

        let urlObj = this.state.url1
        let urlObj2 = this.state.url2

        const url1 = '/lazadaproxy/'+ urlObj
        const url2 = '/lazadaproxy/'+ urlObj2

        let urls = [url1, url2]
        for(var i = 0 ; i < spec.length;  i ++ ){
            if(spec[i].url == url1){
                a1.push(spec[i].data)
            }

            if(spec[i].url == url2){
                a2.push(spec[i].data)
            }
        }

        if(a1.length < a2.length){
            data1 = a2
            data2 = a1
        }else{
            data1 = a1
            data2 = a2
        }
        for(var i = 0 ; i < data1.length;  i ++ ){
            let item = data1[i]
            let isMatch = false
            for(var j = 0 ; j < data2.length;  j ++ ){
                let item2 = data2[j]
                if(item[0].innerText && item[0].innerText == item2[0].innerText){
                    isMatch = true
                    fulldata.push({
                        name : item[0].innerText,
                        p1:  item[1].innerText,
                        p2:  item2[1].innerText
                    })
                    break;
                }
            }
            if(!isMatch){
                fulldata.push({
                    name : item[0].innerText,
                    p1:  item[1].innerText,
                    p2:  ''
                })
            }
        }
        return fulldata;
    }

    fetchData() {
        let urlObj = this.state.url1
        let urlObj2 = this.state.url2

        if (!validUrl.isUri(urlObj) || !validUrl.isUri(urlObj2)){
            alert('Please input url');
            return;
        }

        if(this.state.handling == 2){
            return;
        }
        let that = this
        this.setState({
            handling: 1
        })

        const url1 = '/lazadaproxy/'+ urlObj;
        const url2 = '/lazadaproxy/'+ urlObj2;
        let urls = [url1, url2]

        Promise.all(urls.map(url =>
            fetch(url).then(res => res.json())
            .then(function(data) {
                var el = document.createElement('html')
                el.innerHTML = data
                let table = el.getElementsByClassName('specification-table')
                var tableRows = table[0].rows; // Node/Element interface
                for (var i = 0; i < tableRows.length; i++) {
                    let rowItem = tableRows[i]
                    let cells = tableRows[i].cells
                    spec.push({
                        url: url,
                        data: cells
                    })
                }
            })
        )).then(texts => {
            that.setState({
                handling: 2
            })
        })
    }

    render() {
        let specContent = null
        if(this.state.handling == 1){
            specContent = <div className='col-md-12 col-md-offset-5' ><Loading/></div>
        }else if(this.state.handling == 2){
            let fulldata = this.mappingData()
            //add content spec here
            specContent =<table className="table"><tbody>
            {
                fulldata.map((item, idx) => {
                        return <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.p1}</td>
                          <td>{item.p2}</td>
                        </tr>
                })
            }
            </tbody></table>
        }

        let buttonContent = <div className="col-md-12">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-md"
                                    onClick={this.fetchData}
                                    >Fetch Data Now</button>
                            </div>
        return(
            <div className="col-md-10 col-md-offset-1 main">
                <div className="col-md-12">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="url1"
                            placeholder='Enter an url here'
                            value={this.state.url1}
                            onChange={this.handleChange1}
                          />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="url2"
                            placeholder='Enter an url here'
                            value={this.state.url2}
                            onChange={this.handleChange2}
                          />
                    </div>
                </div>

                {
                    buttonContent
                }
                { specContent }
            </div>
        )
    }
}
export default Main;
