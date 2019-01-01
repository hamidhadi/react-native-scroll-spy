module.exports = (sections, itemHeight, sectionHeaderHeight, sectionFooterHeight = 0) => {
  return sections.reduce((layoutTable, section, sectionIndex) => {
    const layoutTableLastItem = layoutTable[layoutTable.length - 1]
    const currentSectionLayoutTable = []
    let CSLTLength

    currentSectionLayoutTable.push({
      length: sectionHeaderHeight,
      offset: layoutTableLastItem ? (layoutTableLastItem.offset + layoutTableLastItem.length) : 0
    })

    for(let i = 0; i < section.data.length; i++) {
      CSLTLength = currentSectionLayoutTable.length

      currentSectionLayoutTable.push({
        length: itemHeight,
        offset: currentSectionLayoutTable[CSLTLength - 1].offset + currentSectionLayoutTable[CSLTLength - 1].length
      })
    }

    CSLTLength = currentSectionLayoutTable.length
    currentSectionLayoutTable.push({
      length: sectionFooterHeight,
      offset: currentSectionLayoutTable[CSLTLength - 1].offset + currentSectionLayoutTable[CSLTLength - 1].length
    })

    return [
      ...layoutTable,
      ...currentSectionLayoutTable
    ]
  }, [])
}