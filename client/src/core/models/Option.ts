import * as CONST from '../constants';
import { hyphenate, isPlainObject, typeOf } from '../utils';
import { OptionProps } from '../contracts';

export class Option implements OptionProps {
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  private _name: string;

  get value() {
    return this._value;
  }
  set value(value: string) {
    value = typeof value == 'string' ? value : `${value}`;
    this._value = hyphenate(value);
  }
  private _value: string;

  readOnly = false;

  constructor(item: string | [string, string] | OptionProps) {
    switch (typeOf(item)) {
      case 'string':
        item = item as string;
        this.name = item;
        this.value = CONST[item] ?? item;
        break;
      case 'array':
        this.name = item[0];
        this.value = this._getValue(item[1]);
        break;
      case 'object':
        const { name, value } = item as OptionProps;
        this.name = (name ?? value) as string;
        this.value = this._getValue(value);
        break;
      default:
        this.name = 'ERROR';
        this.value = 'error';
    }
  }

  private _getValue(value: any) {
    if (isPlainObject(value)) {
      // side-effect
      this.readOnly = value.readOnly ?? false;
      return value.value;
    } else {
      return value;
    }
  }
}

export const toOption = (item: any) => new Option(item);

const optionsFactory = (
  collection: string | [string, string] | Option[] | Record<string, any>,
): OptionProps[] => {
  if (Array.isArray(collection) && collection.some((item: any) => item instanceof Option)) {
    return collection as OptionProps[];
  }
  if (isPlainObject(collection) || Array.isArray(collection)) {
    const items = isPlainObject(collection) ? Object.entries(collection) : collection;
    return (items as string[]).map(toOption);
  }
  return [toOption(collection)];
};

export const toOptions = (...collection: any[]): OptionProps[] => {
  return collection.reduce((acc: OptionProps[], item: string | OptionProps | [string, string]) => {
    acc.push(...optionsFactory(item));
    return acc;
  }, [] as OptionProps[]);
};
