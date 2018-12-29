/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList, TouchableOpacity} from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import mockData from './MOCK_DATA'
import layoutTableGenerator from './layout_table_generator'

export default class App extends Component {
  state = {
    activeSectionIndex: 0
  }

  generateSection = () => {
    return mockData.reduce((acc, curr) => {
      const sectionIndex = acc.findIndex(section => section.title === curr.color)
      
      if (sectionIndex >= 0) {
        acc[sectionIndex].data.push(curr)
      } else {
        acc.push({ title: curr.color, data: [curr] })
      }
  
      return acc
    }, [])
  }

  renderItem = ({ item, index, section }) => {
    return(
      <View key={item.id} style={{ flex: 1, height: 100, backgroundColor: 'white' }}>
        <Text>{`${item.first_name} ${item.last_name}`}</Text>
        <Text>{`${item.color}`}</Text>
      </View>
    )
  }

  renderSectionHeader = ({section: {title}}) => (
    <View style={{ height: 40, backgroundColor: '#ccc', justifyContent: 'center' }}>
    <Text style={{fontWeight: 'bold'}}>{title}</Text>
    </View>
  )

  // getItemLayout = sectionListGetItemLayout({
  //   // The height of the row with rowData at the given sectionIndex and rowIndex
  //   getItemHeight: (rowData, sectionIndex, rowIndex) => 100,

  //   // These three properties are optional
  //   getSeparatorHeight: () => 0, //1 / PixelRatio.get(), // The height of your separators
  //   getSectionHeaderHeight: () => 40, // The height of your section headers
  //   getSectionFooterHeight: () => 0, // The height of your section footers
  // })

  getItemLayout = (
    data,
    index,
  ) => {
    const layoutTable = layoutTableGenerator(data, 100, 40)

    return {length: layoutTable[index].length, offset: layoutTable[index].offset, index}
  }

  render() {
    const sections = this.generateSection()

    return (
      <View style={styles.container}>
        <SectionList
          style={{ backgroundColor: 'blue' }}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={sections}
          keyExtractor={(item, index) => item.id}
          getItemLayout={this.getItemLayout}
          ref={me => this.sectionList = me}
          maxToRenderPerBatch={20}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 5,
            position: 'absolute',
            left: 0,
            bottom: 0
          }}

          onPress={() => {
            if (this.sectionList) {
              const nextIndex = this.state.activeSectionIndex + 3
              if (nextIndex > sections.length) {
                this.setState({ activeSectionIndex: 0 }, () => this.sectionList.scrollToLocation({ sectionIndex: 0, itemIndex: 0, viewOffset: 40, viewPosition: 0 }))
              } else {
                this.setState({
                  activeSectionIndex: nextIndex
                }, () => this.sectionList.scrollToLocation({ sectionIndex: nextIndex, itemIndex: 0, viewOffset: 40, viewPosition: 0 }))
              }
            }
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Scroll</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
