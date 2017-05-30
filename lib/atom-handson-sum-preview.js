'use babel';

import AtomHandsonSumPreviewView from './atom-handson-sum-preview-view';
import { CompositeDisposable } from 'atom';

export default {

  atomHandsonSumPreviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomHandsonSumPreviewView = new AtomHandsonSumPreviewView(state.atomHandsonSumPreviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomHandsonSumPreviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-handson-sum-preview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomHandsonSumPreviewView.destroy();
  },

  serialize() {
    return {
      atomHandsonSumPreviewViewState: this.atomHandsonSumPreviewView.serialize()
    };
  },

  toggle() {
    console.log('AtomHandsonSumPreview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
