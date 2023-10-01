
export function getAuthor(id: any): any {
  try {
    const resp = {
      id: 1,
      name: 'Rex',
      gender: 'M'
    }
    return resp
  } catch (err) {
    return err
  }
}

export function listAuthors(): any {
  try {
    const resp = [{
      id: 1,
      name: 'Rex',
      gender: 'M'
    }]
    return resp
  } catch (err) {
    return err
  }
}