const {
  handleHttpError,
  handleHttpErrorResponse,
} = require("../utils/handleError");
const { Institution } = require("../app/models");

const checkAuthorizationAction = async (req, res, next) => {
  try {
    const { user } = req;
    const { id, institutionId } = req.params;

    const idSearch = institutionId || id;
    const institution = await Institution.findByPk(idSearch);
    if (!institution || institution.userId !== user.id) {
      return handleHttpErrorResponse(
        res,
        "You are not authorized to perform this action",
        403
      );
    }

    next();
  } catch (error) {
    handleHttpError(res, error.message);
  }
};

module.exports = checkAuthorizationAction;
