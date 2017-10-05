const styles = {
  headerStyle : { //header title for card
    fontSize : 19
  },
  fullWidth:{
    width: '100%'
  },
  marginStyle:{ //card layout margin
    margin: 15
  },
  cardSpacing:{
    margin: 15,
    paddingBottom:16
  },
  zeroPadding:{
    padding: 0
  },
  cardHeaderPadding:{
    paddingBottom:0
  },
  cardTextPadding:{
    padding:'0 15px'
  },
  floatingLabelStyle:{ //fixed floating label
    color:'#6D6B6B',
    fontSize:20,
    whiteSpace: "nowrap"
  },
  setTopMargin: { // checkbox top margin - to get aligned properly
    marginTop: 34
  },
  customColumnStyle : { //column data to overflow instead of ellipsis
    overflow: 'inherit',
    height:'auto',
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  dialogRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0
  },
  dialogContent: {
    position: "relative",
    width: "80vw",
    transform: "",
  },
  dialogBody: {
    paddingBottom: 0
  }
};

export default styles;
