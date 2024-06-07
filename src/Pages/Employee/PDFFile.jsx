import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import useEmployee from '../../Hooks/useEmployee';

const styles = StyleSheet.create({
    body:{
        paddingTop:35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    
        pageNumber:{
            position:'absolute',
            fontSize:12,
            bottom:30,
            left:0,
            right:0,
            textAlign: 'center',
            color: 'black',

        },
        image:
        {
          marginVertical:15,
          marginHorizontal:100,
          height:60,
          width:60
        },
        // text: {
        //     position: 'relative',
        //     right:20,
        //     margin:12,
        //     fontSize: 12,
        //     textAlign:'center',
        //     fontFamily: 'Times-Roman'
        // },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
           
          },
    
  });
const PDFFile = ({company,img,date}) => {
  
    return (
        <Document>
    <Page size="A4" style={styles.page}>
 <div className='flex flex-col'>
 <View className='absolute top-3 '>
        <Text style={styles.header}>Page 1</Text>
      </View>
      <Image style={styles.image} src={img}></Image>
      
        {/* <Text className='absolute top-1' ><img src={img1} alt="" /></Text> */}
  
      <View >
      
        <Text>Comapny Name: {company}</Text>
      </View>
  
      <View >
      
        <Text>Assets is a leading company specializing in comprehensive asset management solutions, empowering businesses to efficiently manage, track, and optimize their valuable resources for maximum productivity and growth.</Text>
      </View>
      <View style={styles.pageNumber}>
      
        <Text>Printing Date: {date}</Text>
      </View>
 </div>
   
    </Page>
  </Document>
    );
};

export default PDFFile;