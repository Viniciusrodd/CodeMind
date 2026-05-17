
// imports
import { parse } from "@babel/parser";
import traverse from '@babel/traverse';
import * as t from "@babel/types";
import { encode } from "gpt-tokenizer";

// import interfaces
import { Chunk } from "@rag/interfaces/rag.interface";


export const traverseCode = (content: string): Chunk[] => {
   
   // properties
   const chunks: Chunk[] = [];
   let chunkIndex = 0;

   // AST setup
   const ast = parse(content, {
      sourceType: 'module',
      plugins: [
         'typescript',
         'jsx',
         'classProperties',
         'decorators-legacy'
      ]
   });


   traverse(ast, {

      // class methods
      ClassMethod(path) {
         const node = path.node;
         let parentName: string = '';

         const parentClass = path.findParent(parent => parent.isClassDeclaration());
         if(parentClass?.node && t.isClassDeclaration(parentClass.node)){
            parentName = parentClass && parentClass.node.id ? parentClass.node.id.name : '';
         }

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         let methodName = 'anonymous';
         if(t.isIdentifier(node.key)) methodName = node.key.name;

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: encode(chunkContent).length,
               chunkType: 'method',
               name: methodName,
               parent: parentName
            }
         });
      },

      // function declaration
      FunctionDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: encode(chunkContent).length,
               chunkType: 'function',
               name: node.id ? node.id.name : ''
            }
         });
      },

      // variable/arrow function
      VariableDeclarator(path) {
         const node = path.node;

         if(t.isArrowFunctionExpression(node.init) || t.isFunctionExpression(node.init)){
            const chunkContent = content.slice(
               node.start!,
               node.end!
            );

            chunks.push({
               content: chunkContent,
               metadata: {
                  chunkIndex: chunkIndex++,
                  tokens: encode(chunkContent).length,
                  chunkType: 'function',
                  name: t.isIdentifier(node.id) ? node.id.name : 'anonymous'
               }
            });
         }
      },

      // ts interface
      TSInterfaceDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: encode(chunkContent).length,
               chunkType: 'interface',
               name: node.id ? node.id.name : ''
            }
         });
      },

      // ts type
      TSTypeAliasDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: encode(chunkContent).length,
               chunkType: 'type',
               name: node.id ? node.id.name : ''
            }
         });
      }

   });

   return chunks;

};