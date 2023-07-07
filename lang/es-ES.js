export default async ({ $axios }, locale) => {
  return await Promise.resolve({
    pages: {
      error: {
        title: 'Lo sentimos',
        buttons: {
          back: 'Volver',
        },
        404: {
          message: 'No se pudo encontrar la página',
        },
        500: {
          message: 'Algo salió mal',
        },
      },
      confirm: {
        headers: {
          unsuccessful: 'Tu donación no fue exitosa',
          please_try_again: 'Por favor, inténtalo de nuevo',
        },
        buttons: {
          try_again: 'Intentar de nuevo',
        },
      },
    },
    components: {
      donate_amount_step: {
        multiplier_text: 'Tu regalo se convierte en',
      },
      payment_provider_list: {
        payment_information: 'Información de pago',
      },
      buttons: {
        back: 'Atrás',
      },
      language_selector: {
        placeholder: 'Selecciona tu idioma',
      },
      button_donate: {
        donate: 'Donar',
      },
      custom_amount: {
        custom_amount_placeholder: 'Ingresa otro monto',
      },
      step_2: {
        header: {
          donation_amount: 'Monto de la donación',
        },
      },
      payment_details_step: {
        subheaders: {
          payment_information: 'Información de pago',
        },
      },
      thank_you_step: {
        header: {
          thank_you: 'Gracias por tu donación',
          payment_processing:
            'Tu donación se está procesando, recibirás un correo de confirmación al completarse',
        },
        subheader: {
          donation_detail: 'Detalle de la donación',
        },
        buttons: {
          support_other_causes: 'Apoyar otras causas',
        },
        fields: {
          donation_amount: 'Monto de la donación',
          name: 'Nombre',
          address: 'Dirección',
          email: 'Correo electrónico',
          date: 'Fecha de donación',
        },
      },
      donorInfoForm: {
        subheaders: {
          fill_donor_code: 'Completa con tu código de donante',
          your_information: 'Tu información',
          address_information: 'Información de dirección',
        },
        fields: {
          title: {
            label: 'Título',
            placeholder: 'Sr.',
          },
          firstName: {
            label: 'Nombre',
            placeholder: 'Juan',
          },
          lastName: {
            label: 'Apellido',
            placeholder: 'Pérez',
          },
          phone_calling_code: {
            label: 'Código de llamada',
            placeholder: '',
          },
          phone_number: {
            label: 'Número de teléfono',
            placeholder: '5145556854',
          },

          email: {
            label: 'Correo electrónico',
            placeholder: 'juan@example.com',
          },
          birthday: {
            label: 'Fecha de nacimiento',
            placeholder: '1980-01-01',
          },
          address_line_1: {
            label: 'Línea de dirección 1',
            placeholder: '...',
          },
          address_line_2: {
            label: 'Línea de dirección 2',
            placeholder: '...',
          },
          country: {
            label: 'País',
            placeholder: '...',
          },
          locality: {
            label: 'Ciudad',
            placeholder: '...',
          },
          dependent_locality: {
            label: 'Nombre del suburbio',
            placeholder: '...',
          },
          administrative_area: {
            label: 'Estado/Provincia',
            placeholder: '...',
          },
          postal_code: {
            label: 'Código postal',
            placeholder: '...',
          },
        },
      },
    },
  })
}
