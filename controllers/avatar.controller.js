const transferFile = async (req, res) => {
  try {
    const { filename } = req.params;
    res.sendFile(filename, { root: './images' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  transferFile,
};