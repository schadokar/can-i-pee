import React, { Component } from "react";
import {
  Form,
  Header,
  Input,
  Button,
  Message,
  Grid,
  Dropdown,
  Icon
} from "semantic-ui-react";

class Pee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avgHrs: "08",
      avgMins: "00",
      effHrs: "",
      effMins: "",
      lastInHrs: "",
      lastInMins: "",
      messageHeader: "",
      messageMeta: "",
      time: "pm",
      leave: false,
      options: [
        { key: "pm ", text: "PM", value: "pm" },
        { key: "am", text: "AM", value: "am" }
      ]
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  pee = () => {
    let {
      effHrs,
      effMins,
      lastInHrs,
      lastInMins,
      avgHrs,
      avgMins,
      time
    } = this.state;

    effHrs = parseInt(this.state.effHrs);
    effMins = parseInt(this.state.effMins);
    lastInHrs = parseInt(this.state.lastInHrs);
    lastInMins = parseInt(this.state.lastInMins);
    avgHrs = parseInt(this.state.avgHrs);
    avgMins = parseInt(this.state.avgMins);

    if (time === "pm") {
      lastInHrs += 12;
    }

    let totalEffMins = effHrs * 60 + effMins;
    let avg = avgHrs * 60 + avgMins;
    let diffInMins;
    let leaveHrs;
    let leaveMins;
    const currentTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata"
    });
    // console.log(currentTime);

    let currentHrs = parseInt(currentTime.split(":")[0]);
    let currentMins = parseInt(currentTime.split(":")[1]);

    totalEffMins += (currentHrs - lastInHrs) * 60 + (currentMins - lastInMins);

    if (avg >= totalEffMins) {
      diffInMins = avg - totalEffMins;
      leaveHrs = currentHrs + Math.floor(diffInMins / 60);
      leaveMins = currentMins + (diffInMins % 60);
      if (leaveHrs > 12) {
        leaveHrs -= 12;
      }
      if (leaveMins >= 60) {
        leaveHrs += 1;
        leaveMins -= 60;
      }

      this.setState({
        leave: false,
        messageHeader: `You can safely pee at ${leaveHrs}:${leaveMins}`,
        messageMeta: `remaining hrs: ${Math.floor(
          (avg - totalEffMins) / 60
        )}:${(avg - totalEffMins) % 60} hrs:mins  |
          Total effective time: ${Math.floor(
            totalEffMins / 60
          )}:${totalEffMins % 60} hrs:mins`
      });
    } else {
      diffInMins = totalEffMins - avg;
      this.setState({
        leave: true,
        messageHeader: `You can leave at any time.`,
        messageMeta: `Extra hrs: ${Math.floor(
          (totalEffMins - avg) / 60
        )}:${(totalEffMins - avg) % 60} hrs:mins |  
          Total effective time: ${Math.floor(
            totalEffMins / 60
          )}:${totalEffMins % 60} hrs:mins`
      });
    }
  };

  message = () => {
    if (this.state.messageHeader) {
      if (this.state.leave) {
        return (
          <Message positive>
            <Message.Header>
              {this.state.messageHeader}
              <br />
              <p>{this.state.messageMeta.split("|")[0]}</p>
              <p>{this.state.messageMeta.split("|")[1]}</p>
            </Message.Header>
          </Message>
        );
      }
      return (
        <Message negative>
          <Message.Header>
            {this.state.messageHeader}
            <br />
            <p>{this.state.messageMeta.split("|")[0]}</p>
            <p>{this.state.messageMeta.split("|")[1]}</p>
          </Message.Header>
        </Message>
      );
    }
  };

  handleChange = (e, result) => {
    const { name, value } = result;
    this.setState({
      [name]: value
    });

    console.log(result.value, result.name);
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header
            className="indexHeader"
            as="a"
            style={{
              fontFamily: "Permanent Marker, sans-serif",
              fontSize: "50px"
            }}
          >
            Can I Pee
            {/* <fff style={{ paddingRight: "300px" }}>Can I Pee</fff>{" "} */}
          </Header>
          <a
            className="sourceCode"
            title="Source Code"
            href="https://github.com/schadokar/can-i-pee.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" link="true" />
            Source Code
          </a>
        </div>
        <div className="row">
          <Form>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Input
                    fluid
                    type="number"
                    name="effHrs"
                    onChange={this.onChange}
                    value={this.state.effHrs}
                    placeholder="Effective Hours"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    fluid
                    type="number"
                    name="effMins"
                    onChange={this.onChange}
                    value={this.state.effMins}
                    placeholder="Effective Mins"
                  />
                </Grid.Column>

                <Grid.Column>
                  <Input
                    fluid
                    label={
                      <Dropdown
                        name="time"
                        onChange={this.handleChange}
                        options={this.state.options}
                        value={this.state.time}
                      />
                    }
                    labelPosition="right"
                    type="number"
                    name="lastInHrs"
                    onChange={this.onChange}
                    value={this.state.lastInHrs}
                    placeholder="Last In Hrs"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    fluid
                    type="number"
                    name="lastInMins"
                    onChange={this.onChange}
                    value={this.state.lastInMins}
                    placeholder="Last in Mins"
                  />
                </Grid.Column>

                <Grid.Column>
                  <Input
                    fluid
                    label={{ content: "average hrs" }}
                    labelPosition="right"
                    type="number"
                    name="avgHrs"
                    onChange={this.onChange}
                    value={this.state.avgHrs}
                    placeholder="average hours"
                  />
                </Grid.Column>
                <Grid.Column>
                  {" "}
                  <Input
                    fluid
                    label={{ content: "average mins" }}
                    labelPosition="right"
                    type="number"
                    name="avgMins"
                    onChange={this.onChange}
                    value={this.state.avgMins}
                    placeholder="average mins"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Button primary fluid onClick={this.pee}>
              Pee
            </Button>
          </Form>
        </div>
        <div className="row">{this.message()}</div>
      </div>
    );
  }
}

export default Pee;
