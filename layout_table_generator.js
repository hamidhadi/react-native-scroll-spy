module.exports = (sections, itemHeight, sectionHeaderHeight, sectionFooterHeight = 0) => {
  return sections.reduce((layoutTable, section, sectionIndex) => {
    const layoutTableLastItem = layoutTable[layoutTable.length - 1]
    const currentSectionLayoutTable = []

    currentSectionLayoutTable.push({
      length: sectionHeaderHeight,
      offset: layoutTableLastItem ? (layoutTableLastItem.offset + layoutTableLastItem.length) : 0
    })

    for(let i = 0; i < section.data.length; i++) {
      let currentSectionLayoutTableLastItem = currentSectionLayoutTable[currentSectionLayoutTable.length - 1]

      currentSectionLayoutTable.push({
        length: itemHeight,
        offset: currentSectionLayoutTableLastItem.offset + currentSectionLayoutTableLastItem.length
      })

      // if(i !== section.data.length - 1) {
      //   currentSectionLayoutTableLastItem = currentSectionLayoutTable[currentSectionLayoutTable.length - 1]
      //   currentSectionLayoutTable.push({
      //     length: 0,
      //     offset: currentSectionLayoutTableLastItem.offset + currentSectionLayoutTableLastItem.length
      //   })
      // }
    }

    const currentSectionLayoutTableLastItem = currentSectionLayoutTable[currentSectionLayoutTable.length - 1]
    currentSectionLayoutTable.push({
      length: sectionFooterHeight,
      offset: currentSectionLayoutTableLastItem.offset + currentSectionLayoutTableLastItem.length
    })

    return [
      ...layoutTable,
      ...currentSectionLayoutTable
    ]
  }, [])
}