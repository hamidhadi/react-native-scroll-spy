module.exports = (sections, itemHeight, sectionHeaderHeight, sectionFooterHeight = 0) => {
  return sections.reduce((layoutTable, section, sectionIndex) => {
    const layoutTableLastItem = layoutTable[layoutTable.length - 1]
    const currentSectionLayoutTable = []

    currentSectionLayoutTable.push({
      length: sectionHeaderHeight,
      offset: layoutTableLastItem ? (layoutTableLastItem.offset + layoutTableLastItem.length) : 0
    })

    for(let i = 0; i < section.data.length; i++) {
      let CSLTLength = currentSectionLayoutTable.length

      currentSectionLayoutTable.push({
        length: itemHeight,
        offset: currentSectionLayoutTable[CSLTLength - 1].offset + currentSectionLayoutTable[CSLTLength - 1].length
      })
    }

    CSLTLength += 1
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