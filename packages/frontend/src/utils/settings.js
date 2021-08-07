export function fromUserConfigs(user) {
  let userRoles = null;
  let userStatus = null;

  if (user) {
    userRoles = {};
    userStatus = {};

    const { roles, status } = user;
    roles.forEach(({ id, name }) => {
      userRoles[id] = name;
    });

    status.forEach(({ id, name }) => {
      userStatus[id] = name;
    });
  }

  return { userRoles, userStatus };
}
