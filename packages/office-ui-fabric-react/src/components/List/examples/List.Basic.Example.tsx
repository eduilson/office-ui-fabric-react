import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle, DefaultFontStyles, FontSizes } from '@uifabric/styling';

export type IExampleItem = { name: string; thumbnail: string; description: string };

export interface IListBasicExampleProps {
  items: IExampleItem[];
}

export interface IListBasicExampleState {
  filterText?: string;
  items?: IExampleItem[];
}

interface IListBasicExampleClassObject {
  itemCell: string;
  itemImage: string;
  itemContent: string;
  itemName: string;
  itemIndex: string;
  chevron: string;
}

const theme: ITheme = getTheme();

const classNames: IListBasicExampleClassObject = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: theme.palette.neutralLight }
      }
    }
  ],
  itemImage: {
    flexShrink: 0
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1
  },
  itemName: [
    DefaultFontStyles.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  ],
  itemIndex: {
    fontSize: FontSizes.small,
    color: theme.palette.neutralTertiary,
    marginBottom: 10
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: theme.palette.neutralTertiary,
    fontSize: FontSizes.large,
    flexShrink: 0
  }
});

export class ListBasicExample extends React.Component<IListBasicExampleProps, IListBasicExampleState> {
  constructor(props: IListBasicExampleProps) {
    super(props);
    this._onFilterChanged = this._onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      items: props.items
    };
  }

  public render(): JSX.Element {
    const { items: originalItems } = this.props;
    const { items = [] } = this.state;
    const resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <TextField label={'Filter by name' + resultCountText} onChange={this._onFilterChanged} />
        <List items={items} onRenderCell={this._onRenderCell} />
      </FocusZone>
    );
  }

  private _onFilterChanged(_: any, text: string): void {
    const { items } = this.props;

    this.setState({
      filterText: text,
      items: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items
    });
  }

  private _onRenderCell(item: IExampleItem, index: number | undefined): JSX.Element {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.name}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          <div>{item.description}</div>
        </div>
        <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
      </div>
    );
  }
}
