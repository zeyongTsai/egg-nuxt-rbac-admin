/*
 * @Author: caizeyong
 * @Date: 2021-01-19 17:09:12
 * @Description:
 */
import Cookies from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
export default function ({ $axios, redirect }) {
  // request interceptor
  $axios.onRequest(
    config => {
      // do something before request is sent
      if (process.client) {
        config.headers['x-csrf-token'] = Cookies.get('csrfToken')
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  $axios.onResponse(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data

      // if the custom code is not 0, it is judged as an error.
      if (res.code !== 0) {
        // if (process.client) {
        //   Message({
        //     message: res.message || 'Error',
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        // }
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          if (process.client) {
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
              confirmButtonText: 'Re-Login',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              // reset token
              redirect('/login')
            })
          } else {
            redirect('/login')
          }
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    }
  )
  $axios.onError(
    error => {
      console.log('err' + error) // for debug
      if (process.client) {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error)
  })
}
