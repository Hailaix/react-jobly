import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  // GET list of companies, filter by ILIKE name
  static async getCompanies(name) {
    //allows empty search to return full list
    const res = name && name !== ''
      ? await this.request('companies', { name })
      : await this.request('companies');
    return res.companies;
  }

  //GET list of jobs, filtering by ILIKE title
  static async getJobs(title) {
    const res = title && title !== ''
      ? await this.request('jobs', { title })
      : await this.request('jobs');
    return res.jobs;
  }

  //GET the current user (should never have to worry about this not getting data)
  static async getUser(username) {
    const res = await this.request(`users/${username}`)
    return res.user;
  }

  //POST username and password in data to login, get token back
  static async login(data) {
    const res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  //POST {username, password, email, firstName, lastName} to register, get token back
  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  //PATCH update user profile with new { firstName, lastName, email, password} in data
  static async editUser(username, data) {
    const res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  //POST have username apply to job with id id
  static async apply(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, 'post');
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;