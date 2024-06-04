import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body:{
        paddingTop:35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
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
            color: 'gray',

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
const PDFFile = () => {
    return (
        <Document>
    <Page size="A4" style={styles.page}>
 <div className='flex flex-col'>
 <View className='absolute top-3 '>
        <Text style={styles.header}>Company</Text>
      </View>
      
        <Text className='absolute top-1' >Hello</Text>
  
      <View >
        <Text >Hi.</Text>
      </View>
 </div>
   
    </Page>
  </Document>
    );
};

export default PDFFile;