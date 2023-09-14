import classes from './MeetupDetail.module.css';
const meetupDetail = (props) => {

    return (
      <section className={classes.detail}>
          <img src = {props.image}/>
          <h1>{props.title}</h1>
          <address>{props.address}</address>
          <p>DESCRIPTION{props.description}</p>

      </section>
    );
};

export default meetupDetail;
