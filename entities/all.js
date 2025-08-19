export const Employee = {
  async list(order = '-created_date', limit = 100) { return []; },
  async create(data) { return; },
  async update(id, data) { return; },
  async filter(params) { return []; }
};

export const TimeEntry = {
  async list(order = '-timestamp', limit = 100) { return []; },
  async create(data) { return; },
  async filter(params, order = '-timestamp', limit = 100) { return []; }
};
