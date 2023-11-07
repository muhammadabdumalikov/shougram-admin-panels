import { regex } from 'const';
import { DateService } from 'services';
import { ImageSizeType } from 'types';

export const validator = {
  id: (value: string) => {
    if (!value) return;
    if (!regex.uuid.test(value)) {
      return {
        message:
          'Incorrect id format. Example: 00000000-0000-0000-0000-000000000000',
        args: {},
      };
    }
  },
  text: (value: string) => {
    if (!value) return;
    if (!value.match(regex.text)) {
      return {
        message: 'Use only latin letters, spaces, special characters',
        args: {},
      };
    }
  },
  textWithoutNumber: (value: string) => {
    if (!value) return;
    if (!value.match(regex.textWithoutNumber)) {
      return {
        message: 'Use only latin letters, special characters',
        args: {},
      };
    }
  },
  textWithNumbers: (value: string) => {
    if (!value) return;
    if (!regex.text.test(value)) {
      return {
        message: 'Use only latin letters, spaces, numbers, special characters',
        args: {},
      };
    }
  },
  email: (value: string) => {
    if (!value) return;
    if (!regex.emailRegExp.test(value)) {
      return {
        message: 'Incorrect email format. Example: namesurname@email.com',
        args: {},
      };
    }
  },
  url: (value: string) => {
    if (!value) return;
    if (!regex.url.test(value)) {
      return {
        message: 'Incorrect link format. Example:  website.com',
        args: {},
      };
    }
  },
  httpUrl: (value: string) => {
    if (!value) return;
    if (!regex.httpUrl.test(value)) {
      return {
        message:
          'Incorrect link format. Example: http://website.com or https://website.com',
        args: {},
      };
    }
  },
  password: (value: string) => {
    if (!value) return;
    if (!regex.password.test(value)) {
      return {
        message: 'Minimum 8 symbols, 1 uppercase, 1 lowercase, 1 digit"',
        args: {},
      };
    }
  },
  fullName: (value: string) => {
    if (!value) return;
    if (!regex.fullName.test(value)) {
      return { message: 'Use only latin letters, hyphen', args: {} };
    }
  },
  notZero: (value: number) => {
    if (value === 0) {
      return {
        message: 'Incorrect number.',
        args: {},
      };
    }
  },
  textRequired:
    (message = 'The name should not consist only of spaces') =>
    (value: string) =>
      !value?.trim() ? message : undefined,
  name: (value: string) => {
    if (!value) return;
    if (!regex.name.test(value)) {
      return {
        message: 'Admin name can contain only only letters, dashes or spaces',
        args: {},
      };
    }
  },
  date: (value: string) => {
    if (!value) return;
    if (!DateService.isValid(value)) {
      return {
        message: 'Date is not valid',
        args: {},
      };
    }
  },
  field: (value: string) => {
    if (!value) return;
    if (regex.onlySpaces.test(value)) {
      return {
        message: 'The field does not accept only spaces',
        args: {},
      };
    }
  },
  imageFileType: (value: string) => {
    if (
      !value ||
      (value !== 'image/png' &&
        value !== 'image/jpeg' &&
        value !== 'image/jpg' &&
        value !== 'image/gif')
    ) {
      return false;
    }

    return true;
  },
  imageSize: (sizes?: ImageSizeType | ImageSizeType[]) => {
    if (!sizes) {
      return;
    }

    if (sizes instanceof Array) {
      for (const size of sizes) {
        if (
          size.width !== size.height ||
          size.width < 128 ||
          size.width > 1024
        ) {
          return {
            message:
              'The width and height of the image must be equal and in the range from 128 to 1024 pixels',
            args: {},
          };
        }
      }
    } else {
      if (
        sizes.width !== sizes.height ||
        sizes.width < 128 ||
        sizes.width > 1024
      ) {
        return {
          message:
            'The width and height of the image must be equal and in the range from 128 to 1024 pixels',
          args: {},
        };
      }
    }
  },
};
