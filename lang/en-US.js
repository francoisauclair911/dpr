export default defineI18nLocale(async locale => {
  return {
    update_amount: 'Update',
    invalid_payment_request_exceptions: {
      generic: 'Something went wrong, please try again later',
      stripe_checkout_failed:
        'An error occured loading this payment provider, try again later or choose a different one',
      amount_too_small:
        'Sorry, your donation amount is too small for this payment provider',
      amount_too_large:
        'Sorry, your donation amount is too large for this payment provider',
    },
    pages: {
      error: {
        title: 'We are sorry',
        buttons: {
          back: 'Go Back',
        },
        domain_not_found: 'No organization found for this url',
        no_fundraising_pages: 'No fundraising pages found',
        fundraising_page_not_found: 'Fundraising page could not be found',
        404: {
          message: 'Page could not be found',
        },
        500: {
          message: 'Something went wrong',
        },
      },
      confirm: {
        headers: {
          unsuccessful: 'Your donation was unsuccessful',
          please_try_again: 'Please try again',
          confirmation_error: 'We could not confirm your donation',
          confirmation_error_instructions:
            'Refresh this page later to verify the status of your donation',
        },
        buttons: {
          try_again: 'Try again',
        },
      },
    },
    components: {
      donation_type_selector: {
        one_time: 'one-time',
        monthly: 'monthly',
      },
      donate_amount_step: {
        multiplier_text: 'Your gift becomes',
      },
      payment_provider_list: {
        payment_information: 'Payment Information',
      },
      buttons: {
        back: 'Back',
      },
      language_selector: {
        placeholder: 'Select your language',
      },
      button_donate: {
        donate: 'Donate',
      },
      custom_amount: {
        custom_amount_placeholder: 'Enter other amount',
      },
      donor_info_step: {
        header: {
          donation_amount: 'Donation Amount',
        },
        monthly: '/ monthly',
        payment_details_button_text: 'Payment Details',
      },
      payment_details_step: {
        subheaders: {
          payment_information: 'Payment Information',
        },
      },
      thank_you_step: {
        header: {
          thank_you: 'Thank you for your donation',
          payment_processing:
            "You donation is beeing processed, you'll receive a confirmation email on completion",
        },
        subheader: {
          donation_detail: 'Donation Details',
        },
        buttons: {
          support_other_causes: 'Support other causes',
        },
        fields: {
          donation_amount: 'Amount',
          name: 'name',
          address: 'address',
          email: 'email',
          date: 'Date',
        },
      },
      donorInfoForm: {
        subheaders: {
          fill_donor_code: 'Fill with your Donor Code',
          your_information: 'Your Information',
          address_information: 'Address Information',
        },
        fields: {
          title: {
            label: 'Title',
            placeholder: 'Mr',
          },
          firstName: {
            label: 'First Name',
            placeholder: 'John',
          },
          lastName: {
            label: 'Last Name',
            placeholder: 'John',
          },
          phone_calling_code: {
            label: 'Calling Code',
            placeholder: '',
          },
          phone_number: {
            label: 'Phone Number',
            placeholder: '5145556854',
          },

          email: {
            label: 'Email',
            placeholder: 'john@example.com',
          },
          birthday: {
            label: 'Birthdate',
            placeholder: '1980-01-01',
          },
          address_line_1: {
            label: 'Address Line 1',
            placeholder: '...',
          },
          address_line_2: {
            label: 'Address Line 2',
            placeholder: '...',
          },
          country: {
            label: 'Country',
            placeholder: '...',
          },
          locality: {
            label: 'City',
            placeholder: '...',
          },
          dependent_locality: {
            label: 'Suburb Name',
            placeholder: '...',
          },
          administrative_area: {
            label: 'State/Province',
            placeholder: '...',
          },
          postal_code: {
            label: 'Postal code',
            placeholder: '...',
          },
        },
      },
    },
  }
})
